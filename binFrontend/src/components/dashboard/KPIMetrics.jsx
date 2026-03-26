<<<<<<< HEAD
import { useState } from 'react';
=======
import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
import TotalBins    from './cards/TotalBins';
import BinsAbove90  from './cards/BinsAbove90';
import RouteDistance from './cards/RouteDistance';
import FuelSaved    from './cards/FuelSaved';
import AvgFillLevel from './cards/AvgFillLevel';
import VehicleType  from './cards/VehicleType';
<<<<<<< HEAD

/* wrapper that adds click + pop animation to any card */
const ClickCard = ({ children }) => {
=======
import KPIDetailModal from './KPIDetailModal';

/* wrapper that adds click + pop animation to any card */
const ClickCard = ({ id, onClick, children }) => {
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
  const [popping, setPopping] = useState(false);

  const handleClick = () => {
    setPopping(true);
<<<<<<< HEAD
    setTimeout(() => { setPopping(false); }, 220);
=======
    setTimeout(() => { setPopping(false); onClick(id); }, 220);
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer rounded-xl transition-shadow hover:shadow-md hover:-translate-y-0.5 transition-transform duration-150 ${popping ? 'kpi-card-click' : ''}`}
      style={{ outline: 'none' }}
    >
      {children}
    </div>
  );
};

const KPIMetrics = ({ bins = [], analytics = {} }) => {
<<<<<<< HEAD
  const totalBins  = analytics.totalBins ?? bins.length;
  const alertBins  = analytics.binsAbove90 ?? bins.filter(b => b.fillLevel >= 90).length;
  const normalBins = totalBins - alertBins;

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <ClickCard><TotalBins totalBins={totalBins} normalBins={normalBins} alertBins={alertBins}/></ClickCard>
        <ClickCard><BinsAbove90 alertCount={analytics.binsAbove90 ?? 0} sinceYesterday={0}/></ClickCard>
        <ClickCard><RouteDistance distance={analytics.routeDistance ?? 0} estimatedTime={analytics.estimatedTime ?? '--'}/></ClickCard>
        <ClickCard><FuelSaved percentage={analytics.fuelSaved ?? 0}/></ClickCard>
        <ClickCard><AvgFillLevel fillLevel={analytics.avgFillLevel ?? 0}/></ClickCard>
        <ClickCard><VehicleType evPercentage={analytics.evPercentage ?? 0}/></ClickCard>
      </div>
=======
  const [activeModal, setActiveModal] = useState(null);

  const totalBins  = bins.length || 150;
  const alertBins  = bins.filter(b => b.fillLevel >= 90).length || 40;
  const normalBins = totalBins - alertBins;

  const modalData = {
    totalBins:    { totalBins, normalBins, alertBins },
    binsAbove90:  { alertCount: analytics.binsAbove90 || 18 },
    routeDistance:{ distance: analytics.routeDistance || 82, estimatedTime: analytics.estimatedTime || '2 hr 5 min' },
    fuelSaved:    { percentage: analytics.fuelSaved || 15 },
    avgFillLevel: { fillLevel: analytics.avgFillLevel || 63 },
    vehicleType:  { evPercentage: analytics.evPercentage || 56 },
  };

  const open  = useCallback((id) => setActiveModal(id), []);
  const close = useCallback(() => setActiveModal(null), []);

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <ClickCard id="totalBins"     onClick={open}><TotalBins    totalBins={totalBins} normalBins={normalBins} alertBins={alertBins}/></ClickCard>
        <ClickCard id="binsAbove90"   onClick={open}><BinsAbove90  alertCount={analytics.binsAbove90 || 18} sinceYesterday={-1}/></ClickCard>
        <ClickCard id="routeDistance" onClick={open}><RouteDistance distance={analytics.routeDistance || 82} estimatedTime={analytics.estimatedTime || '2 hr 5 min'}/></ClickCard>
        <ClickCard id="fuelSaved"     onClick={open}><FuelSaved    percentage={analytics.fuelSaved || 15}/></ClickCard>
        <ClickCard id="avgFillLevel"  onClick={open}><AvgFillLevel fillLevel={analytics.avgFillLevel || 63}/></ClickCard>
        <ClickCard id="vehicleType"   onClick={open}><VehicleType  evPercentage={analytics.evPercentage || 56}/></ClickCard>
      </div>

      {activeModal && createPortal(
        <KPIDetailModal
          type={activeModal}
          data={modalData[activeModal]}
          onClose={close}
        />,
        document.body
      )}
>>>>>>> a370dd646ee6c7c0d95edc771f031057615feaf6
    </>
  );
};

export default KPIMetrics;
