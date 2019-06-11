import React from 'react';
import './ImageList.css';
import ImageCard from './ImageCard'

const ImageList = (props) => {
    console.log(props.images)
    // const photos = props.images.map((image)=>{
    //     return <img alt={image.description} key={image.id} src={image.urls.small}/>
    // })
    const photos = props.images.map((image)=>{
            return <ImageCard key={image.id} image={image}/>
        })
    return (
        <div className='image-list'>{photos}</div>
    )
}
export default ImageList