Labelled radio group for garment size (arrow-key navigable); sold-out sizes are disabled with a diagonal strike and "sold out" in the accessible name.
```jsx
<SizeSelector sizes={[{label:'S'},{label:'M'},{label:'L',available:false},{label:'XL'}]} value={size} onChange={setSize} aside={<Button variant="link" size="sm">Size guide</Button>} />
```
