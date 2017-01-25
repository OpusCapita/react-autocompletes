### Synopsis

FakeInputAutocomplete is a simple clearly looking autocomplete.

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| defaultValue | string | Initial input value |
| filter | func | Filter function `(itemValue, searchQuery) => {}` |
| placeholder | string | Input placeholder |
| items | arrayOf(shape({ key: string, value: string }) | Array of items |
| inputElement | func | Most of all - is a stateless component. Example: `() => <input className="form-group"/>` |
| onChange | func | Callback fired on input change `(event, inputNewValue) => {}`|
| onSelect | func | Callback fired on item selection `(event, itemKey) => {}` |
| ~origin~ TODO | oneOf([ 'top', 'bottom', 'left', 'right' ]) | |
  maxSuggessionsHeight: PropTypes.number
  
### Methods Reference

* `focus()` - focus input

### Code Example

```
<FakeInputAutocomplete 
  onSelect={(event, key) => console.log('Selected item with key: ' + key)}
  onChange={(event, string) => console.log('onChange', string)}
  placeholder="Start typing"
  items={[
    { key: 'PIM installation', value: 'PIM installation' },
    { key: 'PROV installation', value: 'PROV installation' },
    { key: 'DAM installation', value: 'DAM installation' },
    { key: 'SIM installation', value: 'SIM installation' },
    
    { key: 'PIM installation 2', value: 'PIM installation 2' },
    { key: 'PROV installation 2', value: 'PROV installation 2' },
    { key: 'DAM installation 2', value: 'DAM installation 2' },
    { key: 'SIM installation 2', value: 'SIM installation 2' },
    
    { key: 'Old PIM installation', value: 'PIM installation' },
    { key: 'Old PROV installation', value: 'PROV installation' },
    { key: 'Old DAM installation', value: 'DAM installation' },
    { key: 'Old SIM installation', value: 'SIM installation' },
    
    { key: 'Old PIM installation 2', value: 'PIM installation 2' },
    { key: 'Old PROV installation 2', value: 'PROV installation 2' },
    { key: 'Old DAM installation 2', value: 'DAM installation 2' },
    { key: 'Old SIM installation 2', value: 'SIM installation 2' }
  ]}
/>
```

### Contributors
Kirill Volkovich

### Component Name

FakeInputAutocomplete

### License

Licensed by © 2016 OpusCapita

