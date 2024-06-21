import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const StatisticsComponent = () => {
  const [statistics, setStatistics] = useState(null);
  const [annoncesville, setAnnoncesVille] = useState(null);
  const [annoncesauthor, setAnnoncesAuthor] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/statistiques/annonces/categorie')
      .then(response => response.json())
      .then(data => {
        setStatistics(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques :', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/statistiques/annonces/ville')
      .then(response => response.json())
      .then(data => {
        setAnnoncesVille(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques par ville :', error);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/statistiques/annonces/auteurs')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAnnoncesAuthor(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques par auteur :', error);
      });
  }, []);

  if (!statistics || !annoncesville || !annoncesauthor) {
    return <div>Chargement des statistiques...</div>;
  }

  const categories = statistics.map(item => item.category);
  const totals = statistics.map(item => item.total);
  const cities = annoncesville.map(item => item.city);
  const totalCity = annoncesville.map(item => item.total);
  
  const authors = annoncesauthor.map(item => item.author_idname); // Utilisation de author_idname au lieu de author
  const totalAuthor = annoncesauthor.map(item => item.total);

  //3 meilleurs auteurs
  const barData = {
    labels: authors,
    datasets: [
      {
        label: 'Les plus grands prêteurs',
        data: totalAuthor,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ]
      }
    ]
  };
  const pieData = {
    labels: categories,
    datasets: [
      {
        label: 'Nombre d\'annonces par catégorie',
        data: totals,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ]
      }
    ]
  };

  const lineData = {
    labels: cities,
    datasets: [
      {
        label: 'Nombre d\'annonces par ville',
        data: totalCity,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="statistics-container">
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: '20px', overflowX: 'auto' }}>
        <div className="chart">
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsComponent;
