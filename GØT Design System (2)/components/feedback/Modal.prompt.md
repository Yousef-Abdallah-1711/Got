Dialog for size guide, confirmations, cookie settings; no nested modals.
```jsx
<Modal open={open} title="Size guide" onClose={() => setOpen(false)} footer={<Button onClick={close}>Done</Button>}>…</Modal>
```
