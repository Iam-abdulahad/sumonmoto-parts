import ContactForm from "../../Contact/ContactForm";
import Banner from "../Banner/Banner";
import BusinessSummary from "../BusinessSummary/BusinessSummary";
import CompanyOverview from "../CompanyOverview/CompanyOverview";
import CustomerReview from "../CustomerReview/CustomerReview";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CompanyOverview></CompanyOverview>
            <BusinessSummary></BusinessSummary>
            <CustomerReview></CustomerReview>
            <ContactForm></ContactForm>
        </div>
    );
};

export default Home;