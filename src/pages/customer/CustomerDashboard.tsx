import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wine, Star, ShoppingCart, Calendar, Gift, Heart, TrendingUp, Percent } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '../../api/users';
import { getWineRatings } from '../../api/wines';
import { getOrderHistory } from '../../api/orders';
import TutorialOverlay from '../../components/TutorialOverlay';
import TasteCurationSurvey from '../../components/TasteCurationSurvey';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [wineRatings, setWineRatings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const [profileData, ratingsData, ordersData] = await Promise.all([
          getUserProfile(user.id),
          getWineRatings(user.id),
          getOrderHistory(user.id)
        ]);
        setProfile(profileData);
        setWineRatings(ratingsData);
        setOrders(ordersData);

        // Check if the user needs to take the survey
        if (profileData && profileData.has_completed_survey === false) {
          setShowSurvey(true);
        } 
        // Check if the user has completed the survey but hasn't seen the tutorial
        else if (profileData && !profileData.has_seen_tutorial) {
          setShowTutorial(true);
          await updateUserProfile(user.id, { has_seen_tutorial: true });
        }

        // Special handling for test email
        if (user.email === 'joshuaheathgervais@gmail.com') {
          setShowSurvey(profileData && profileData.has_completed_survey === false);
          setShowTutorial(profileData && profileData.has_completed_survey === true && !profileData.has_seen_tutorial);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleSurveyComplete = async (surveyData) => {
    try {
      await updateUserProfile(user.id, { 
        has_completed_survey: true,
        survey_data: surveyData
      });
      setShowSurvey(false);
      setShowTutorial(true);
    } catch (err) {
      console.error('Error updating user profile:', err);
      setError('Failed to save survey data');
    }
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (showSurvey) {
    return <TasteCurationSurvey onComplete={handleSurveyComplete} />;
  }

  const winesTasted = wineRatings.length || '--';
  const averageRating = wineRatings.length > 0
    ? (wineRatings.reduce((sum, rating) => sum + rating.rating, 0) / wineRatings.length).toFixed(1)
    : '--';
  const upcomingDeliveries = orders.filter(order => order.status === 'pending').length || '--';
  const nextEvent = '--'; // This should be fetched from your events data

  const winesTastedData = [
    { month: 'Jan', count: 5 },
    { month: 'Feb', count: 8 },
    { month: 'Mar', count: 12 },
    { month: 'Apr', count: 10 },
    { month: 'May', count: 15 },
    { month: 'Jun', count: wineRatings.length || 0 },
  ];

  const topRatedWines = wineRatings
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
    .map(rating => rating.wine_name || 'Wine Name');

  const customerWidgets = [
    { title: 'Wines Tasted', value: winesTasted, icon: Wine, color: 'bg-red-500', size: 'col-span-1', path: '/my-wines' },
    { title: 'Average Rating', value: averageRating, icon: Star, color: 'bg-yellow-500', size: 'col-span-1', path: '/rate-wines' },
    { title: 'Upcoming Deliveries', value: upcomingDeliveries, icon: ShoppingCart, color: 'bg-blue-500', size: 'col-span-1', path: '/order-history' },
    { title: 'Next Event', value: nextEvent, icon: Calendar, color: 'bg-green-500', size: 'col-span-1', path: '/customer-calendar' },
    { title: 'Wines Tasted', chart: 'lineChart', size: 'col-span-2 row-span-2', path: '/my-wines' },
    { title: 'Your Top Rated Wines', list: topRatedWines, icon: TrendingUp, size: 'col-span-2 row-span-2', path: '/my-wines' },
    { title: 'Recommended Wines', size: 'col-span-4', path: '/recommendations' },
  ];

  return (
    <div className="p-6 ml-20">
      <h1 className="text-3xl font-semibold mb-6">Welcome to Your Wine Dashboard</h1>
      
      <div className="grid grid-cols-4 gap-6">
        {customerWidgets.map((widget, index) => (
          <div 
            key={index} 
            className={`bg-gray-800 rounded-lg shadow-md p-6 ${widget.size} cursor-pointer hover:bg-gray-700 transition-colors duration-200`}
            onClick={() => handleCardClick(widget.path)}
          >
            <h2 className="text-xl font-semibold mb-4">{widget.title}</h2>
            {widget.value && (
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{widget.value}</p>
                {widget.icon && <widget.icon className={`h-10 w-10 ${widget.color} rounded-full p-2`} />}
              </div>
            )}
            {widget.list && (
              <ul className="list-disc list-inside">
                {widget.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {widget.chart === 'lineChart' && (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={winesTastedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#10B981" name="Wines Tasted" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        ))}
      </div>
      
      {showTutorial && <TutorialOverlay onClose={() => setShowTutorial(false)} />}
    </div>
  );
};

export default CustomerDashboard;