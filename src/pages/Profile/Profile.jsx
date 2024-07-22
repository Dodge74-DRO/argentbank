import User from '../../components/User/User.jsx';
import Account from '../../components/Account/Account.jsx';
import AccountCardData from '../../data/AccountCardData.json';

/* User profile page */
function UserProfile() {

    return (
        <div className='profile-page'>
            <main className='bg-dark'>
                {/* appel componant User */}
                < User />
                {/* lister les comptes du User */}
                {AccountCardData.map((data) => (
                    /* Return account component */
                    <Account
                        key={data.id}
                        title={data.title}
                        amount={data.amount}
                        description={data.description}
                    />
                ))}
            </main>
        </div>
    )
}

export default UserProfile