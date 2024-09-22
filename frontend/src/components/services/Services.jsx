import "./services.css";
export default function Services() {
  return (
    <div className="services">
      <h2>Our Services</h2>
      <p className="services-subtitle">
        Transfrom Your Taxi Service With Our Reliable Taxi Managment Solution
      </p>
      <div className="services-boxes">
        <div className="box">
          <ion-icon name="desktop-outline"></ion-icon>
          <h2>Admin Portal</h2>
          <p>For End To End Cab Services Business Operations Managment</p>
        </div>
        <div className="box">
          <ion-icon name="wallet-outline"></ion-icon>
          <h2>Driver Payout</h2>
          <p>
            Automated driver payout calculation hadling based on km and base
            fare
          </p>
        </div>
        <div className="box">
          <ion-icon name="git-network-outline"></ion-icon>
          <h2>Fleet Managment</h2>
          <p>
            Register and manage fleet inventory and availability for optimum
            utilization
          </p>
        </div>
        <div className="box">
          <ion-icon name="stats-chart-outline"></ion-icon>
          <h2>Bussness Insights</h2>
          <p>
            Insights on revenue analysis customer feedback and driver
            performance
          </p>
        </div>
        <div className="box">
          <ion-icon name="browsers-outline"></ion-icon>
          <h2>Customer Website</h2>
          <p>Take your bussness to next stage with your own website</p>
        </div>
        <div className="box">
          <ion-icon name="phone-landscape-outline"></ion-icon>
          <h2>Driver App</h2>
          <p>Employee performance and task managment with payout</p>
        </div>
      </div>
    </div>
  );
}
