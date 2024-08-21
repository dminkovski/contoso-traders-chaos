interface HeaderMessageProps {
    type: string;
    icon: string;
    message: string;
}
const HeaderMessage = ({ type, icon, message }:HeaderMessageProps) => {
    return ( 
        <div className={`headerMessageDiv ${type}`}>
            <img className='icon' src={icon} alt=""/>
            <p className='message m-0'>{message}</p>
        </div> 
    );
}

export default HeaderMessage;