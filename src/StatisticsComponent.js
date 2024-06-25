import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const StatisticsComponent = () => {
  const [statistics, setStatistics] = useState(null);
  const [annoncesVille, setAnnoncesVille] = useState(null);
  const [annoncesAuthor, setAnnoncesAuthor] = useState(null);

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
        setAnnoncesAuthor(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des statistiques par auteur :', error);
      });
  }, []);

  if (!statistics || !annoncesVille || !annoncesAuthor) {
    return <div>Chargement des statistiques...</div>;
  }

  const categories = statistics.map(item => item.category);
  const totals = statistics.map(item => item.total);
  const cities = annoncesVille.map(item => item.city);
  const totalCity = annoncesVille.map(item => item.total);

  // Trier les auteurs par total d'annonces et ne garder que les 3 premiers
  const topAuthors = [...annoncesAuthor]
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);

  const authors = topAuthors.map(item => item.author_idname);
  const totalAuthor = topAuthors.map(item => item.total);

  // Données pour le graphique à barres des meilleurs auteurs
  const barDataAuthors = {
    labels: authors,
    datasets: [
      {
        label: 'Les plus grands prêteurs',
        data: totalAuthor,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ]
      }
    ]
  };

  // Données pour le graphique à secteurs des catégories
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

  // Données pour le graphique à colonnes des villes
  const barDataCities = {
    labels: cities,
    datasets: [
      {
        label: 'Nombre d\'annonces par ville',
        data: totalCity,
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  return (
    <div className="statistics-container">
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: '20px', overflowX: 'auto' }}>
        <div className="chart">
          <Bar data={barDataAuthors} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
        <div className="chart">
          <Bar data={barDataCities} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsComponent;
