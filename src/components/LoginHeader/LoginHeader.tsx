import './LoginHeader.css';

const LoginHeader: React.FC = () => {
    return (
        <div className="login-header-container">
            <img src={`/assets/images/logoLogin/logoLogin.png`} alt="Tarot de sábila"
                srcSet={`
                    /assets/images/logoLogin/logoLogin.png 1x,
                    /assets/images/logoLogin/logoLogin@2x.png 2x,
                    /assets/images/logoLogin/logoLogin@3x.png 3x
                `} />
        </div>
    );
};

export default LoginHeader;
