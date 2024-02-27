export const selectedTabStyles = {
  position: 'relative',
  borderRadius: '5px 5px 0 0',
  fontWeight: '600',
  fontSize: '0.6rem',
  _after: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    height: '5px',
    backgroundColor: '#7A72DF',
    display: 'block',
    content: '""',
    width: '100%'
  }
};

export const packages: ['basic', 'standard', 'premium'] = [
  'basic',
  'standard',
  'premium'
];
