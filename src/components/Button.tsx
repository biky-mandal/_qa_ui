import '../styles/button.css';

interface ButtonProps {
    title: string;
    type: string;
    clickHandler: Function;
}

const Button = ({ title, type, clickHandler }: ButtonProps) => {
    return (
        <button onClick={() => clickHandler()} className={type === 'primary' ? 'primary' : 'secondary'}>
            {title}
        </button>
    )
}

export default Button;