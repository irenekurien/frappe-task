# Copyright (c) 2023, irene and contributors
# For license information, please see license.txt

# import frappe
import frappe
from frappe.model.document import Document


class UserStock(Document):
	def before_save(self):
		stock = frappe.get_doc('Stock', self.stock_id)
		stock_name = stock.tradingsymbol
		stock_price = stock.latest_price		

		self.stock_name = stock_name
		self.stock_price = stock_price

