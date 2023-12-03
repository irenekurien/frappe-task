import { Card, CardContent, Typography } from '@mui/material';

type CustomCardPropsType = {
    heading: string;
    content: string;
}

const CustomCard = ({ heading, content }:CustomCardPropsType) => {
  return (
    <Card elevation={3} sx={{ maxWidth: 300, margin: 2 }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="h5" component="div">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
