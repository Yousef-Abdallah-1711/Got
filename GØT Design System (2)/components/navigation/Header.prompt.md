Site header with three modes — store, minimal (Coming Soon) and checkout.
```jsx
<Header nav={[{label:'Shop',current:true},{label:'Drop 01'},{label:'About'}]} cartCount={2} theme={theme} onToggleTheme={setTheme} onCart={openCart} />
<Header mode="checkout" />
```
- Height 64/72/80px by breakpoint. Uses typeset Wordmark until the vector mark is supplied.
