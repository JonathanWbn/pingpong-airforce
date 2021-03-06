type Props = { onChange: (value: string) => void }

type SelectProps = Omit<React.HTMLProps<HTMLSelectElement>, 'onChange'>

const Select: React.FunctionComponent<Props & SelectProps> = ({ onChange, ...props }) => {
  return (
    <>
      <select onChange={(e) => onChange(e.target.value)} {...props} />
      <style jsx>{`
        select {
          background-color: var(--background);
          outline: none;
          border: var(--dividing-border);
          border-radius: var(--border-radius-small);
          padding: 6px 12px;
          width: 100%;
          transition: border 0.2s ease 0s;
          font-size: 14px;
          height: 36px;
        }
        input::placeholder {
          color: var(--grey);
          font-weight: 300;
        }
        select:focus {
          border: 1px solid var(--black);
        }
      `}</style>
    </>
  )
}

export default Select
