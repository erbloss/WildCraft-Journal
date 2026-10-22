export default function SpeciesTypeDropdown({
    value = "",
    onChange, disabled = false
}) {
    // array indexing corresponds to index values of asset speciesList with exception of "other" which has been added as last index option.
    const speciesTypeOptions = [
        "Edible Plants",
        "Medicinal Herbs",
        "Wild Mushrooms, Edible",
        "Toxic Plants",
        "Toxic Mushrooms",
        "Other",
    ];

    return (
        <div className="form-row">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            >
                <option value="">
                    -- Select Species Type --
                </option>

                {speciesTypeOptions.map((speciesType) => (
                    <option key={speciesType} value={speciesType}>
                        {speciesType}
                    </option>
                ))}
            </select>
        </div>
    );
}