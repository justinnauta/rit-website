// Sets up the document's layout once it is ready
$(document).ready(function () {
    let layout = (
        <React.Fragment>
            <Nav />
            <About />
            <Degrees />
            <Minors />
            <Employment />
            <People />
            <PageFooter />
        </React.Fragment>
    );
    ReactDOM.render(layout, document.querySelector('#root'));
});

// Returns the results of an ajax 'get' call to the IST API proxy
// nodePath: The specific node of the api to get
function XHR(nodePath) {
    return $.ajax({
        type: 'get',
        url: 'https://solace.ist.rit.edu/~plgics/proxy.php',
        dataType: 'json',
        data: { path: nodePath },
        cache: false,
        async: true
    })
}
