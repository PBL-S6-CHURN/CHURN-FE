import React from 'react'

export default function CustomSelect({value, onChange, options, defaultLabel}) {
    return (
        <div class="custom-select">
            <select
            value={value}
            onChange={onChange}
            >
                <option value="" selected>
                    {defaultLabel}
                </option>
                { options.map((option) => <option value={option.value}>{option.value.charAt(0).toUpperCase() + option.value.slice(1)}</option>) }    
            </select>
            <span class="custom-arrow"></span>
        </div>
    )
}
