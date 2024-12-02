const Footer = () => {
  return (
    <div className="backdrop-blur-sm z-40">
      <footer className="footer container mx-auto p-10 bg-neutral text-neutral-content text-white z-40">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <nav>
            <h6 className="footer-title text-lg font-semibold mb-4">
              Services
            </h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="link link-hover">
                  Branding
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Advertisement
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <h6 className="footer-title text-lg font-semibold mb-4">Company</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="link link-hover">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Press kit
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <h6 className="footer-title text-lg font-semibold mb-4">Legal</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="link link-hover">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Cookie policy
                </a>
              </li>
            </ul>
          </nav>
          <nav>
            <h6 className="footer-title text-lg font-semibold mb-4">
              Resources
            </h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="link link-hover">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="link link-hover">
                  Community
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
