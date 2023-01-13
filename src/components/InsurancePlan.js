import { useState } from "react";


function InsurancePlan({plan, onSelect}){
    const [isSelected, setIsSelected]=useState(false);
    const handleSelect = ()=>{
        setIsSelected(!isSelected);
        onSelect(plan, isSelected);
    }


    return (
        <div>
            <h2>compare Plans</h2>
            <input type="checkbox" checked={isSelected} onChange={handleSelect} />
                
                
                <div>Price:{plan.price}</div>
                <div>Name:{plan.name}</div>
                <div>Description:{plan.description}</div>
                <div>Type:{plan.type}</div>
                <div>Section:{plan.section}</div>
                <div>BestSeller:{plan.bestSellers}</div>
                </div>
          
       
    )


}

export default InsurancePlan;