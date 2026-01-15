import { animated } from '@react-spring/web';

interface JustifiedTextProps {
  text: string;
  className?: string;
  style?: {};
  animation: {};
}

const JustifiedText = ({
  text,
  className,
  style = {},
  animation,
  ...props
}: JustifiedTextProps) => {
  // Dividimos el texto en un array de caracteres
  const characters = text.split('');

  return (
    <animated.p
      {...props}
      className={className}
      style={{
        ...animation,
        ...style,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {characters.map((char, index) => (
        <span key={index}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </animated.p>
  );
};

export default JustifiedText;
