import { useNavigate } from 'react-router-dom';

const peak = () => {
    const options = [
        {key: "Peak season"}, {key: "Non-Peak season"}
    ];
    const handleSubmit() => {
        console.log('Selected values', selectedValues);
        if (selectedValues === "Peak") {
            navigate("/peak");
        } else {
            navigate("/nonpeak");
        }
    }
};

export default peak