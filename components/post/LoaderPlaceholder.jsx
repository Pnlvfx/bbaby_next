const LoaderPlaceholder = (props) => {
      const loaderStyles = {
        backgroundColor: '#818384',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        ...props.extraStyles
      };

      const loaderSwipeStyles = {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        background: 'linear-gradient(to right, #eeeeee 10%, #dddddd 50%, #eeeeee 90%)',
        animation: 'loaderSwipeAnim 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite',
        height: '100%'
    }
  return (
    <div style={loaderStyles} className='mb-5'>
        <div style={loaderSwipeStyles}>

        </div>
    </div>
  )
}

export default LoaderPlaceholder