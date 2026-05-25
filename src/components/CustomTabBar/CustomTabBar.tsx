import { useHistory } from 'react-router';
import './CustomTabBar.css';
import CustomTabItem from './CustomTabItem';
import { personAddSharp, personCircleOutline, chatbubblesOutline, help } from 'ionicons/icons';

type CustomTabBarProps = {
    active: 'home' | 'chat' | 'profile' | 'help';
};

const CustomTabBar: React.FC<CustomTabBarProps> = ({ active = 'home' }) => {

    const history = useHistory();

    const handleTabItemClick = (newLocation: string) => {
        history.replace(newLocation);
        
    }

    return (
        <div className="custom-tab-bar-container">
            <CustomTabItem isActive={active === 'home'} text='Mesa de trabajo' icon={personAddSharp} onClick={ () => handleTabItemClick('/home')} />
            <CustomTabItem isActive={active === 'chat'} text='Mesanjes' icon={chatbubblesOutline} onClick={ () => handleTabItemClick('/my-chats')} />
            <CustomTabItem isActive={active === 'profile'} text='Perfil' icon={personCircleOutline} onClick={ () => handleTabItemClick('/my-profile')} />
            <CustomTabItem isActive={active === 'help'} text='Ayuda' icon={help} onClick={ () => handleTabItemClick('/help')} />
        </div>
    );
};

export default CustomTabBar;
