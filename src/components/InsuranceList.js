import { useState, useEffect } from 'react';
import '../index.css';
import InsurancePlan from './InsurancePlan';

function InsuranceList(){
    const [sortBy, setSortBy]= useState('price');
    const [plans, setPlans]=useState([]);
    const[allPlans,setAllPlans]=useState([]);
    const [filterBy, setFilterBy]=useState('');
    const [viewMode,setViewMode]=useState('list');
    const [selectedPlans, setSelectedPlans]=useState([]);
    const [planComparison, setPlanComparison]= useState(false);

    useEffect(()=>{
        const data=[
            {
              "id": 1,
              "price": 100,
              "name": "Atlas-america",
              "description": "Best comprehensive plan for visitors",
              "type": "Comprehensive",
              "section": "Travel Medical",
              "bestSellers": true
            },
            {
              "id": 2,
              "price": 150,
              "name": "Atlas-international",
              "description": "Best comprehensive plan for international travel",
              "type": "Comprehensive",
              "section": "International Travel Medical",
              "bestSellers": true
            },
            {
                "id": 3,
                "price": 75,
                "name": "IMG Patriot America",
                "description": "Comprehensive plan for visitors",
                "type": "Comprehensive",
                "section": "Travel Medical",
                "bestSellers": true
              },
              {
                "id": 4,
                "price": 250,
                "name": "IMG Patriot International",
                "description": "Comprehensive plan for international travel",
                "type": "Comprehensive",
                "section": "International Travel Medical",
                "bestSellers": false
              },
              {
                "id": 5,
                "price": 15,
                "name": "Visitor Care",
                "description": "Fixed plan for domestic travel",
                "type": "Fixed",
                "section": "Travel Medical",
                "bestSellers": true
              },
        ]
    
        setPlans(data);
        setAllPlans(data);
    },[])

    //useEffect(()=>{
       // handleChange("price")

    //},[plans])

    const handleSelect = (e, plan)=>{
    setPlanComparison(false) 
     if(selectedPlans.find(p => p.id == plan.id)){
         setSelectedPlans(selectedPlans.filter(p => p.id !== plan.id));
    }
    else {
       setSelectedPlans([...selectedPlans, plan]);
       }
       console.log(selectedPlans)
    }       
    

    const renderedPlans= plans.map((plan)=>{
        return (

            <div className={viewMode=="grid"? "insuranceCard": "insuranceList"} key={plan.id}>
            <div><input type="checkbox" id={plan.id} name={plan.id} value={plan.id} onChange={(e) => handleSelect(e,plan)}/></div>
                    <div>Price:{plan.price}</div>
                    <div>Name:{plan.name}</div>
                    <div>Description:{plan.description}</div>
                    <div>Type:{plan.type}</div>
                    <div>Section:{plan.section}</div>
                    <div>BestSeller:{plan.bestSellers}</div>
            </div>)
    })
    
       const handleChange =(sortType) =>{
        setSortBy(sortType);
        console.log(sortType)
            switch(sortType){
            case 'name': 
                setPlans([...plans].sort((a,b) => a.name.localeCompare(b.name)));
            break;
            case 'price':
                setPlans([...plans].sort((a,b)=>a.price -b.price));
            break;
            default:
                break;
        }   }
    
       
        const handleFilter = (filterType) => {
            setFilterBy(filterType);
            console.log(filterType)
            let filteredPlans = [...allPlans];
            console.log(filteredPlans)
            if(filterType === 'bestSellers') {
              filteredPlans = filteredPlans.filter(plan => plan.bestSellers);
              console.log(filteredPlans)
            }
            if(filterType === 'policyMax') {
              filteredPlans = filteredPlans.filter(plan => plan.price === 250);
              
            }
            if(filterType === 'type') {
              filteredPlans = filteredPlans.filter(plan => plan.type === "Fixed");
            }
            if(filterType === 'section') {
              filteredPlans = filteredPlans.filter(plan => plan.section === "International Travel Medical");
            }
            setPlans(filteredPlans);
          }
       
          const handleView=(viewType)=>{
            setViewMode(viewType);
        }
    
        const comparePlans = ()=>{
            if(selectedPlans.length<2 || selectedPlans.length>4){
                return;
            }
           setPlanComparison(true);
        }
       
        return (
            <div className='parent-container'>
            <div className='top'>
            <h2>Coverage Plans</h2>
            <div className='selectArea'>
            <div className='sortBox'>
            <label>Sort By</label>
            <select onChange={(e)=>handleChange(e.target.value)}>
                <option value="">Select</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
            </select>
            </div>
           
            <div className='filterBox'>
            <label>Filter By</label>
                <select onChange={(e)=>handleFilter(e.target.value)}>
                    <option value="">Select</option>
                    <option value="bestSellers">Best Seller</option>
                    <option value="policyMax">Policy Max</option>
                    <option value="type">Type</option>
                    <option value="section">Section</option>
                </select>
            </div>
    
            <div className='viewMode'>
                <label>View Mode</label>
                <select onChange={(e) =>handleView(e.target.value)}>
                    <option value='list'>List</option>
                    <option value='grid'>Grid</option>
                </select>
            </div>
    
            </div>
            </div>
               
            <div>{renderedPlans}</div>

           <div>
            <button type='button' onClick={comparePlans}>Compare Plans</button>
           </div>
           {planComparison && <div> 
            {selectedPlans.map(plan =>{
                return <div>{ plan.name} </div>
            })}
            </div>}
            </div>
        

        );
}

export default InsuranceList;