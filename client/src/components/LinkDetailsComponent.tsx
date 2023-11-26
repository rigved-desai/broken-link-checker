import LinkDetails from "@/interfaces/LinkDetails"
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap'
})

function LinkDetailsComponent({linkDetails} : {linkDetails : LinkDetails}) {

  return (
    <>
    {linkDetails?.numberOfLinks != undefined ?  
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <h1 className={firaCode.className} style={{
          fontSize: '24px',
          fontWeight: '600',
          letterSpacing: '1px'
        }}>NUMBER OF BROKEN LINKS FOUND = {linkDetails.numberOfLinks}</h1>
          {Array.isArray(linkDetails.brokenLinks) && linkDetails.brokenLinks.length > 0 ?
          <>
        <div className={firaCode.className} style={{
          width: '50%',
          marginTop: '20px',
          marginBottom: '20px',
          padding: '50px 70px',
          border: '2px solid #001524',
          borderRadius: '20px',
          backgroundColor: '#001524',
          color: '#FDE5D4'
          
        }}>
          <ol style={{
            width: '100%',
            boxSizing: 'border-box',
            listStyleType: 'decimal'
          }}>
          {linkDetails.brokenLinks.map((item, index) => (
            <li style={{
              width: '100%',
              boxSizing: 'border-box',
              overflowWrap: 'break-word',
              display: 'list-item',
              marginBottom: '10px'
            }} key={index}>{<a href={item}>{item}</a>}</li>
      ))}
    </ol>
    </div>
          </> 
        : <></>}
        
    </div> 
    : linkDetails.error  ? 
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
  }}>
    <h1 className={firaCode.className}  style={{
          fontSize: '24px',
          fontWeight: '600',
          letterSpacing: '1px'
    }}>ERROR CONNECTING TO THE WEBSITE, PLEASE CHECK IF THE URL IS VALID OR NOT!</h1>
  </div>
  :
  <></>
  }
    </>
  )
}

export default LinkDetailsComponent
