import { useFrappeGetDocList, useFrappeAuth } from "frappe-react-sdk";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Input } from "../../components";

type Pledge = {
  loan_id: string
  stock_id: string;
  price: number;
  number_of_share: number;
};

type FormProps = {
  pledge: Pledge;
  onChange: (updatedPledge: Pledge) => void;
};

const CreatePledgeForm = ({ pledge, onChange }: FormProps) => {
  const { currentUser } = useFrappeAuth();

  const { data: options } = useFrappeGetDocList("UserStock", {
    fields: ["name", "number_of_shares", "stock_name", "stock_price"],
    filters: [["owner", "=", currentUser || ""]],
  });

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    if(name === 'stock_id') {
      const p = options?.find((opt) => {
        if(opt.name === value)
          return opt
      })
      console.log(p.stock_price)
    } 
    onChange({ ...pledge, [name]: value });
  };

  return (
    <div style={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="select-stock-label">Stock</InputLabel>
        <Select
          labelId="select-stock-label"
          id="select-stock"
          name="stock_id"
          value={pledge.stock_id}
          label="Stock"
          onChange={handleInputChange}
        >
          {options &&
            options?.map((opt, idx) => (
              <MenuItem key={idx} value={opt.name}>{opt.stock_name}</MenuItem>
            ))}
        </Select>
        <Input
          label="Price"
          type="price"
          value={pledge.price}
          onChange={handleInputChange}
        />
        <Input
          label="Number of Share"
          type="number_of_share"
          value={pledge.number_of_share}
          onChange={handleInputChange}
        />
      </FormControl>
    </div>
  );
};

export default CreatePledgeForm;
