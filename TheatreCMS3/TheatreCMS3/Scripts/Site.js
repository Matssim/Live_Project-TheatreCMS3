
function switchVisible() {
    if (document.getElementById('non-expired')) {

        if (document.getElementById('non-expired').style.display == 'none') {
            document.getElementById('non-expired').style.display = 'block';
            document.getElementById('expired').style.display = 'none';
            document.getElementById('Button1').value = "Expired Rentals";
        }
        else {
            document.getElementById('non-expired').style.display = 'none';
            document.getElementById('expired').style.display = 'block';
            document.getElementById('Button1').value = "Current Rentals";
        }
    }
}