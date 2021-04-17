import React from 'react';

const cities = [
    {
        id: 1,
        city: 'Osh'
    },
    {
        id: 2,
        city: 'Bishkek'
    },
    {
        id: 3,
        city: 'Issyk-Kul'
    },
    {
        id: 4,
        city: 'Batken'
    },
    {
        id: 5,
        city: 'Talas'
    },
    {
        id: 6,
        city: 'Naryn'
    },
    {
        id: 7,
        city: 'Jalal-Abad'
    }
]

const Search = () =>{
    const [options, setOptions] = useState([]);

    const onInputChange = e =>{
        setOptions(cities.filter(option => option.city.includes(e.target.value)))
    }

    return(
        <div>
            Hello
        </div>
    )
}

export default Search;