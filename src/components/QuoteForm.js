import {useState, useEffect} from 'react';
import '../index.css';
import moment from 'moment';

function QuoteForm({onSubmit}){
    const [error, setError ]=useState({startDate: '',
    endDate: '',
    policyMax: '',
    citizenship: '',
    age: '',
    mailingState: '',});

    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        policyMax: 50,
        citizenship: '',
        age: '',
        mailingState: '',
      });

    const policyMaxValue = [
        {value: 50, label: '50,000'},
        {value: 100, label: '100,000'},
        {value: 250, label: '250,000'},
        {value: 500, label: '500,000'}
      ]

    const handleFormSubmit =(event)=>{
        event.preventDefault();
        if(!validateForm()){
            onSubmit(formData);
        }
    };

    const handleFormReset = (event) =>{
        event.preventDefault();
        setFormData({startDate:'', endDate: '', policyMax: '', citizenship: '', age: '', mailingState: ''});
    };

    const handleChange=(event)=>{
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));  
      };

      // Form Validations

      const validateForm = () => {
        const newErrors = {};
        let isError=false;

        if (!formData.startDate) {
          newErrors.startDate = "Start date is required";
          isError=true;
          
        }
    
        if (!formData.endDate) {
          newErrors.endDate = "End date is required";
          isError=true;

        }
    
        if (!formData.policyMax) {
          newErrors.policyMax = "Policy max is required";
          isError=true;

        }
    
        if (!formData.citizenship) {
          newErrors.citizenship = "Citizenship is required";
          isError=true;

        }
    
        if (!formData.age) {
          newErrors.age = "Age/Year is required";
          isError=true;

        }
    
        if (!formData.mailingState) {
          newErrors.mailingState = "Mailing State is required";
          isError=true;

        }
    
        if(!formData.startDate && !moment(formData.startDate, "MM/DD/YYYY").isValid()) {
          newErrors.startDate = "Start date is not in MM/DD/YYYY format";
          isError=true;

        }
    
        if(!formData.endDate && !moment(formData.endDate, "MM/DD/YYYY").isValid()) {
          newErrors.endDate = "End date is not in MM/DD/YYYY format";
          isError=true;

        }
    
        if(!formData.startDate || !formData.endDate || moment(formData.endDate, "MM/DD/YYYY").isBefore(moment(formData.startDate, "MM/DD/YYYY"))) {
          newErrors.endDate = "End date should be after start date";
          isError=true;

        }
    
        if (formData.citizenship && formData.citizenship.match(/[0-9!@#%^&*()_+-={}|:"<>,.?/]/)) {
          newErrors.citizenship="Should not be number or special character";
          isError=true;

        }

        setError(newErrors);
        console.log(newErrors)
        return isError;
    }

    const handleBlur = (event) => {
        if (!event.target.value) {
          setError({
            ...error,
            [event.target.name]: "This field is required"
          });
        } else {
          setError({
            ...error,
            [event.target.name]: ""
          });
        }
      };

      const handleFocus= (event)=>{
        setError({
            ...error,
            [event.target.name]: ""
          });
      }

    return (
        <div>
            <h2>Quote Form</h2>
        <div className='card'>
            <form>
                <label>Start Date</label>
                <input type='date' name="startDate" value={formData.startDate} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} required/>
                { error.startDate && (<div className='danger'>{ error.startDate}</div>)}
                <br />
                <label>End Date</label>
                <input type='date' name="endDate" value={formData.endDate} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} required/>
                { error.endDate && (<div className='danger'>{ error.endDate}</div>)}

                <br />
                <label>Policy Max</label>
                <select type='text' name="policyMax" value={formData.policyMax} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} required>
                {policyMaxValue.map((option, index)=>(
                    <option key={index} value={option.value}>{option.value}</option>
                ))}
                </select>
                { error.policyMax && (<div className='danger'>{ error.policyMax}</div>)}

                <br />
                <label>Citizenship</label>
                <input type='text' name="citizenship" value={formData.citizenship} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} required/>
                { error.citizenship && (<div className='danger'>{ error.citizenship}</div>)}

                <br />
                <label>Age</label>
                <input type='text' name="age" value={formData.age} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} required/>
                { error.age && (<div className='danger'>{ error.age}</div>)}

                <br />
                <label>Mailing State</label>
                <input type='text' name="mailingState" value={formData.mailingState} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} required/>
                { error.mailingState && (<div className='danger'>{ error.mailingState}</div>)}

                <br />

                <button type='submit' onClick={handleFormSubmit}>Submit</button>
                <button type='reset' onClick={handleFormReset}>Reset</button>

    </form>
    </div>
    </div>
    );
}

export default QuoteForm;