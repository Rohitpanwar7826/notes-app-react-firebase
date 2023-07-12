const styleObject = {
  headingDiv: {
    background: "linear-gradient(45deg, black, transparent)"
  }
}

const Heading = (props) => {
  return (
    <div className='w-100 d-flex align-items-center justify-content-center my-5 m-0 p-0'>
      <div className='container bg-darK p-1 bg-primary text-white text-center align-items-center m-0 rounded-circle' style={styleObject.headingDiv}>
        <h3 className='w-100 title p-2' data-aos="fade-left">
          {props.title}
        </h3>
      </div>
    </div>
  )
}

export default Heading