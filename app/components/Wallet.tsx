interface WalletProps {
    className?: string;
  }
  
  const Wallet: React.FC<WalletProps> = ({ className }) => {
    const wallet = 6000;
    return (
      <div className={`flex w-max ${className}`}>
        <h1 className="text-3xl">Wallet: {wallet}</h1>
      </div>
    );
  };
  
  export default Wallet;
  