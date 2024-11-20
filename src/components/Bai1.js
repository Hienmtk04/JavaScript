import '../assets/css/style.css'
import styles from '../assets/css/style.module.css'
import logo from '../assets/images/logo192.png'
function Bai1() {
    const data = {
        name: 'React',
        items: ['Item 1', 'Item 2', 'Item 3']
    };
    const myStyle = {
        color: "white",
        backgroundColor: "blue",
        padding: "10px",
        fontFamily: "Sans-Serif"
      };
    return(
        <>
        <h1 style={{color: "green"}}>Hello, {data.name} </h1>
        <p style={{backgroundColor: "pink"}}>This is an example of JSX</p>
        <ul style={myStyle}>
            {data.items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
        </ul>
        <div className='styleCss'>
            <h3>This content's style is in a css file</h3>
            <img src="logo192.png"/>
            <img src={require('../assets/images/logo192.png')}/>
            <img src={logo}/>
        </div>
        <div className={styles.styleModuleCss}>
            <h3>This content's style is in a css module file</h3>
        </div>
        </>
    );
}
export default Bai1;