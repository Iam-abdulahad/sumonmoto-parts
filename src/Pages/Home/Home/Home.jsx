import ContactForm from "../../Contact/ContactForm";
import Banner from "../Banner/Banner";
import CompanyOverview from "../CompanyOverview/CompanyOverview";
import CustomerReview from "../CustomerReview/CustomerReview";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CompanyOverview></CompanyOverview>
            <CustomerReview></CustomerReview>
            <ContactForm></ContactForm>
        </div>
    );
};

export default Home;