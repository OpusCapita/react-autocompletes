### Synopsis

FakeInputAutocomplete is a simple clearly looking autocomplete.

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

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| demoProp | string | Write a description of the property |

### Contributors
Kirill Volkovich

### Component Name

FakeInputAutocomplete

### License

Licensed by © 2016 OpusCapita

