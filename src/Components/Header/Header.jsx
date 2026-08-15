import "./Header.scss";

const Header = ( children ) => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    Pet Ledger
                </div>
            </div>
        </header>
    )
}
export default Header;