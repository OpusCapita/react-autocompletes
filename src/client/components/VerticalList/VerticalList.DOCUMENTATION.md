### Synopsis

VerticalList is a simple lists representaion component.

### Props Reference

| Name                          | Type                  | Description                                                |
| ------------------------------|:----------------------| -----------------------------------------------------------|
| items | arrayOf(shape({ key: string, value: string }) | Array of items |
| onClick | func | Callback fired on item click `(event, itemKey) => {}`|

### Code Example

```
<VerticalList 
  onClick={key => console.log('Clicked on item with key: ' + key)}
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

VerticalList

### License

Licensed by © 2016 OpusCapita

