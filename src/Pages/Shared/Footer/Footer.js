


const Footer = () => {
    const date = new Date();
    const yearIs = date.getFullYear();
    
    return (
        <div className="mt-5">
            <h4 className="py-5 text-center bg-primary text-light">CopyRight &copy; {yearIs}</h4>
        </div>
    );
};

export default Footer;