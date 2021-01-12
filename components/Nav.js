// Represents the navbar
class Nav extends React.Component {
    componentDidMount() {
        // Set up the mobile burger menu
        $(".navbar-burger").click(function () {
            $(".navbar-burger").toggleClass("is-active");
            $(".navbar-menu").toggleClass("is-active");
        });

        // Set up highlight on scroll
        $(window).scroll(function () {
            const position = $(this).scrollTop();

            $('.section').each(function () {
                const target = $(this).offset().top;
                const id = $(this).attr('id');

                if (position >= target - 10) {
                    $('.navbar-start a').removeClass('active-nav-item');
                    $('.navbar-start a[href=\\#' + id + ']').addClass('active-nav-item');
                }
            });
        });
    }

    render() {
        return (
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    {/* Logo */}
                    <a className="navbar-item" href="#">
                        <img src="../ITSLogo.png" />
                    </a>

                    {/* Burger menu */}
                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navItems">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navItems" className="navbar-menu">
                    <div id="bro" className="navbar-start">
                        <a className="navbar-item" href="#aboutSection">Home</a>
                        <a className="navbar-item" href="#degreesSection">Degrees</a>
                        <a className="navbar-item" href="#minorsSection">Minors</a>
                        <a className="navbar-item" href="#employmentSection">Employment</a>
                        <a className="navbar-item" href="#peopleSection">People</a>
                    </div>
                </div>
            </nav>
        );
    }
}
