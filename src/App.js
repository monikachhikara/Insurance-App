import QuoteForm from "./components/QuoteForm";
import InsuranceList from "./components/InsuranceList";
import { useState } from "react";

function App(){
  const [showInsurancePage, setShowInsurancePage] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(true);

  function handleSubmit(term){
    setShowInsurancePage(true);     
    setShowQuoteForm(false);
  };
        
  return (
    <div>
      {showQuoteForm && <QuoteForm onSubmit={handleSubmit}/>}

      {showInsurancePage && <InsuranceList />}
    </div>
  )
}

export default App;