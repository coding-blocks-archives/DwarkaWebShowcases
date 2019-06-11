import React from 'react';
// import axios from 'axios';
// https://github.com/facebook/create-react-app/issues/4607#issuecomment-409711775
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import unsplash from '../api/unsplash'

class App extends React.Component{
    state = {images: []};
    
    onSearchSubmit = async (term)=>{
        // console.log(term);
        // get request using axios
        const response = await unsplash.get('/search/photos',{
            params: {query: term },
        });
        // console.log(response.data.results);
        this.setState({images: response.data.results})
        console.log(this.state)
    }
    
    render(){    
        return(
            <div className='ui container'>
                <SearchBar newSubmit = {this.onSearchSubmit} />
                Found: {this.state.images.length} images
                <ImageList images = {this.state.images} />
            </div>
        )
    }
}
export default App;