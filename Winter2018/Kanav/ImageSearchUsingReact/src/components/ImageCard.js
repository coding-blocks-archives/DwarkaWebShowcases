import React from 'react';


class ImageCard extends React.Component {
  
    constructor(props){
        super(props)
        this.imageRef = React.createRef()
        this.state = {spans: 0}
    }

    // componentDidMount(){
    //     // console.log(this.imageRef)
    //     console.log(this.imageRef.current.clientHeight)
    //     // Maybe this is async func first lower one will work  because its more precise
    //     // so its giving us 0 because its showing data without loading imageref
    // }    
    // They both(upper n lower functions are working same) 
    componentDidMount(){
            // console.log(this.imageRef)
            this.imageRef.current.addEventListener('load', this.setSpan)
            console.log(this.imageRef.current.clientHeight)
            // Maybe this is async func first lower one will work  because its more precise
            // so its giving us 0 because its showing data without loading imageref
        }

    setSpan = ()=> {
        // console.log(this.imageRef.current.clientHeight)
        const height = this.imageRef.current.clientHeight
        let span = Math.ceil(height / 20)
        this.setState({spans: span})

    }


    
    render(){
        const {description, urls} = this.props.image
        return (
                <div style={{gridRowEnd: `span ${this.state.spans}`}}>
                    <img ref={this.imageRef} src={urls.regular} alt={description} />
                </div>
            )
    }
    
}
export default ImageCard