document.addEventListener("DOMContentLoaded", () => {
    const countryCodeSelect = document.getElementById("country-code-select");
    const countrySelect = document.getElementById("country-select");

    let countryDataMap = [];

    const fetchCountries = async () => {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();
        return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    };

    const populateDropdowns = (countries) => {
        countryDataMap = countries
            .filter(c => c.idd?.root && c.idd.suffixes?.length)
            .map(country => ({
                name: country.name.common,
                dialCode: country.idd.root + country.idd.suffixes[0],
                flag: country.flags?.png
            }));

        // Clear dropdowns
        countryCodeSelect.innerHTML = "";
        countrySelect.innerHTML = "";

        // Default placeholders
        const defaultCodeOption = document.createElement("option");
        defaultCodeOption.value = "";
        defaultCodeOption.disabled = true;
        defaultCodeOption.selected = true;
        defaultCodeOption.textContent = "Dial Code*";
        countryCodeSelect.appendChild(defaultCodeOption);

        const defaultNameOption = document.createElement("option");
        defaultNameOption.value = "";
        defaultNameOption.disabled = true;
        defaultNameOption.selected = true;
        defaultNameOption.textContent = "Country*";
        countrySelect.appendChild(defaultNameOption);

        countryDataMap.forEach(({ name, dialCode, flag }) => {
            const codeOption = document.createElement("option");
            codeOption.value = dialCode;
            codeOption.textContent = `${name} (${dialCode})`;
            codeOption.dataset.name = name;
            codeOption.dataset.flag = flag;
            countryCodeSelect.appendChild(codeOption);

            const nameOption = document.createElement("option");
            nameOption.value = name;
            nameOption.textContent = name;
            nameOption.dataset.dial = dialCode;
            nameOption.dataset.flag = flag;
            countrySelect.appendChild(nameOption);
        });
    };

    const addSyncListeners = () => {
        countryCodeSelect.addEventListener("change", () => {
            const selectedDial = countryCodeSelect.value;
            const match = countryDataMap.find(c => c.dialCode === selectedDial);
            if (match) {
                countrySelect.value = match.name;

                // Update the selected text to just show the dial code
                const selectedOption = countryCodeSelect.options[countryCodeSelect.selectedIndex];
                selectedOption.textContent = match.dialCode;
            }
        });

        countrySelect.addEventListener("change", () => {
            const selectedName = countrySelect.value;
            const match = countryDataMap.find(c => c.name === selectedName);
            if (match) {
                countryCodeSelect.value = match.dialCode;

                // Update the selected text to just show the dial code
                const selectedOption = countryCodeSelect.options[countryCodeSelect.selectedIndex];
                selectedOption.textContent = match.dialCode;
            }
        });
    };

    fetchCountries()
        .then(countries => {
            populateDropdowns(countries);
            addSyncListeners();
        })
        .catch(() => {
            countryCodeSelect.innerHTML = '<option disabled selected>Could not load country codes</option>';
            const errorOption = document.createElement("option");
            errorOption.textContent = "Failed to load countries.";
            errorOption.disabled = true;
            countrySelect.appendChild(errorOption);
        });
});