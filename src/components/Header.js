// src/components/Header.js
import Link from 'next/link';

const Header = () => {
    return (
        <header>
            <h1>Mental Health Sentiment Analysis</h1>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
