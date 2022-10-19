function TempSubmitWid() {

    return (
      <div className='bg-reddit_dark-brighter w-[310px] rounded-md h-96 mb-5 border border-reddit_border box-content'>
          <div 
            className="object-contain" 
            style={{
              backgroundImage: `url("/topCommunitiesIcon.webp")`,
              backgroundColor: '#0079d3',
              backgroundPosition: '50%',
              backgroundRepeat: 'no-repeat',
              height: '70px',
              position: 'relative'
            }}
          >
          </div>
          <p className="text-reddit_text-darker text-sm">Please be mindful of bbaby content policy</p>    
      </div>
    )
  }
  
  export default TempSubmitWid;