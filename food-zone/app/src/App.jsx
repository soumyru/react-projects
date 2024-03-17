import { useState } from 'react';
import styled from'styled-components';
import { useEffect } from 'react';
import SearchResult from './components/SearchResult/SearchResult';

export const BASE_URL="http://localhost:9000";//JSON data url


const App = () => {
  const[data,setData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [filteredData,setFilteredData]=useState(null);
  const [selectedBtn,setSelectedBtn]=useState("all");


  useEffect(()=>{
    const fetchFoodData=async()=>{
      setLoading(true);
  
      try{
      const response=await fetch(BASE_URL);
      const json=await response.json();
      setData(json);
      setFilteredData(json);
      setLoading(false);
      // console.log(json);
      }
      catch(error){
        setError("Unable to fetch data");
      }
    };

  fetchFoodData();
  },[])

  const searchFood=(e)=>{
    const searchValue=e.target.value;
    // console.log(searchValue);

    if(searchValue===""){
      setFilteredData(null);
    }

    const filter=data?.filter((food)=>food.name.toLowerCase().includes(searchValue.toLowerCase()))

    setFilteredData(filter);
  
  };

  const filteredFood=(type)=>{
    if(type==="all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter=data?.filter((food)=>
    food.type.toLowerCase().includes(type.toLowerCase()
    ));
    setFilteredData(filter);
    setSelectedBtn(type);
  }

  const filterBtns=[
    {
      name:"All",
      type:"all"
    },
    {
      name:"Breakfast",
      type:"breakfast"
    },
    {
      name:"Lunch",
      type:"lunch"
    },
    {
      name:"Dinner",
      type:"dinner"
    },
    // {
    //   name:"Midnight",
    //   type:"midnight"
    // } //we can also create a new button so easily
  ]

// console.log(data);

//Structure of data of a food card
// const temp=[
//   {
//       "name": "Boilded Egg",
//       "price": 10,
//       "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
//       "image": "/images/egg.png",
//       "type": "breakfast"
//   }
// ]

  if(error) return <div>{error}</div>
  if(loading) return <div>loading...</div>

  return( 
  <>
  <Container>
    <TopContainer>
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className="search">
        <input onChange={searchFood} type="text" placeholder='Search Food'/>
      </div>
    </TopContainer>

    <FilterContainer>
      {filterBtns.map((value)=>(
      <Button 
      isSelected={selectedBtn===value.type}//using this such that when a btn is seelcted then using this we will keep th ebtn in dark red color to show that it is selected
      key={value.name} 
      onClick={()=>filteredFood(value.type)}
      >{value.name}</Button>))}

      {/*the above is short cut using map for the below commented code */}

      {/* <Button onClick={()=>filteredFood("all")}>All </Button>
      <Button onClick={()=>filteredFood("breakfast")}>Breakfast </Button>
      <Button onClick={()=>filteredFood("lunch")}>Lunch </Button>
      <Button onClick={()=>filteredFood("dinner")}>Dinner </Button> */}
    </FilterContainer>
  </Container>

  <SearchResult data={filteredData}/>
  </>

)};

export default App;

export const Container=styled.div`
max-width: 1200px;
margin: 0 auto;
`;


const TopContainer=styled.div`
height:140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;

.search{
  input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 4px;
    &::placeholder {
        color: white;
      }
  }
}

@media (0<width<600px){
  flex-direction: column;
  height: 120px;
}

`;

const FilterContainer=styled.section`
display:flex;
justify-content: center;
gap: 12px;
padding-bottom: 40px;
`;


export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")}; //if a btn is selected then it'll be in dark red color else the default red
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;
