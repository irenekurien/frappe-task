# Copyright (c) 2023, irene and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Pledges(Document):
	def validate(self):
		if float(self.number_of_share) > self.get_user_share_count():
			frappe.throw("Number of share pledged cannot exceed the number of shares owned by the User.", frappe.ValidationError)
 
		self.validate_ltv_ratio()

	def get_user_share_count(self):
		user_stock = frappe.get_doc('UserStock', self.stock_id)
		return user_stock.number_of_shares

	def validate_ltv_ratio(self):
		loan = frappe.get_doc("Loan", self.loan_id)
		total_pledged_value = float(self.number_of_share) * float(self.price)
		
		ltv_ratio = self.calculate_ltv_ratio(loan, total_pledged_value)

		required_ltv_ratio = 0.5

		if ltv_ratio > required_ltv_ratio:
			frappe.throw("The LTV ratio exceeds the allowed limit. Please adjust the number of shares or the price.", frappe.ValidationError)

		loan.ltv_ratio = ltv_ratio

		loan.save()

	def calculate_ltv_ratio(self, loan, total_pledged_value):
		pending_principal = loan.amount - loan.amount_paid
		outstanding_interest = loan.outstanding_interest
		penalty_charges = loan.penalty_charges

		total_loan_value = pending_principal + outstanding_interest + penalty_charges

		ltv_ratio = total_loan_value / total_pledged_value if total_pledged_value else 0

		return ltv_ratio