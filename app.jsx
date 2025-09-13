import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Database, Zap, TrendingUp, Settings, Play, Pause, Square, Monitor, Users, Clock, CheckCircle, AlertCircle, Activity } from 'lucide-react';

const AITrainingPlatform = () => {
  const [activeTraining, setActiveTraining] = useState(null);
  const [trainingJobs, setTrainingJobs] = useState([]);
  const [systemMetrics, setSystemMetrics] = useState({
    gpuUtilization: 87.3,
    memoryUsage: 74.2,
    activeNodes: 247,
    totalNodes: 500,
    trainingSpeed: 1.2,
    modelAccuracy: 94.7
  });

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    lossValue: 0.0234,
    accuracy: 94.7,
    learningRate: 0.0001,
    batchSize: 512,
    epoch: 15,
    totalEpochs: 100
  });

  // Mock training jobs
  const mockJobs = [
    {
      id: 1,
      name: "GPT-4 Fine-tuning - Financial Domain",
      model: "transformer-xl",
      status: "training",
      progress: 67,
      eta: "2h 34m",
      accuracy: 94.2,
      loss: 0.0156,
      gpus: 32,
      startTime: "2024-01-15 09:30",
      dataset: "Financial Q&A - 2.3M samples",
      priority: "high"
    },
    {
      id: 2,
      name: "BERT Medical Classification",
      model: "bert-large",
      status: "completed",
      progress: 100,
      eta: "Completed",
      accuracy: 96.8,
      loss: 0.0089,
      gpus: 16,
      startTime: "2024-01-14 14:15",
      dataset: "Medical Records - 1.8M samples",
      priority: "medium"
    },
    {
      id: 3,
      name: "Custom Vision Model - Manufacturing",
      model: "resnet-152",
      status: "queued",
      progress: 0,
      eta: "Waiting",
      accuracy: 0,
      loss: 0,
      gpus: 8,
      startTime: "Queued",
      dataset: "Industrial Images - 500K samples",
      priority: "low"
    },
    {
      id: 4,
      name: "Reinforcement Learning - Trading Bot",
      model: "ppo-transformer",
      status: "training",
      progress: 23,
      eta: "4h 12m",
      accuracy: 87.1,
      loss: 0.0445,
      gpus: 24,
      startTime: "2024-01-15 11:45",
      dataset: "Market Data - 10M transactions",
      priority: "high"
    }
  ];

  useEffect(() => {
    setTrainingJobs(mockJobs);
    setActiveTraining(mockJobs[0]);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        ...prev,
        lossValue: Math.max(0.001, prev.lossValue - 0.0001 + (Math.random() - 0.5) * 0.0002),
        accuracy: Math.min(99.9, prev.accuracy + (Math.random() - 0.4) * 0.1),
        learningRate: prev.learningRate * (0.999 + Math.random() * 0.002)
      }));

      setSystemMetrics(prev => ({
        ...prev,
        gpuUtilization: Math.max(70, Math.min(95, prev.gpuUtilization + (Math.random() - 0.5) * 2)),
        memoryUsage: Math.max(60, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 1.5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'training': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'queued': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'training': return <Play size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'queued': return <Clock size={16} />;
      case 'failed': return <AlertCircle size={16} />;
      default: return <Monitor size={16} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const TrainingJobCard = ({ job, isActive, onClick }) => (
    <div 
      className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-200 border-2 ${
        isActive ? 'border-blue-500 shadow-xl' : 'border-gray-200 hover:border-blue-300'
      } ${getPriorityColor(job.priority)}`}
      onClick={() => onClick(job)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800 mb-2">{job.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{job.model}</p>
          <p className="text-xs text-gray-500">{job.dataset}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(job.status)}`}>
          {getStatusIcon(job.status)}
          <span className="ml-1 capitalize">{job.status}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{job.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${job.progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Accuracy</p>
          <p className="font-bold text-green-600">{job.accuracy}%</p>
        </div>
        <div>
          <p className="text-gray-600">Loss</p>
          <p className="font-bold text-blue-600">{job.loss.toFixed(4)}</p>
        </div>
        <div>
          <p className="text-gray-600">GPUs</p>
          <p className="font-bold">{job.gpus}</p>
        </div>
        <div>
          <p className="text-gray-600">ETA</p>
          <p className="font-bold">{job.eta}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Brain className="text-cyan-400 mr-3" size={32} />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Neural Training Orchestrator
                </h1>
                <p className="text-sm text-gray-300">Advanced AI Training Infrastructure</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-green-500/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                <span className="text-sm">System Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* System Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">GPU Utilization</p>
                <p className="text-2xl font-bold text-cyan-400">{systemMetrics.gpuUtilization.toFixed(1)}%</p>
              </div>
              <Cpu className="text-cyan-400" size={24} />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Memory Usage</p>
                <p className="text-2xl font-bold text-blue-400">{systemMetrics.memoryUsage.toFixed(1)}%</p>
              </div>
              <Database className="text-blue-400" size={24} />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Nodes</p>
                <p className="text-2xl font-bold text-green-400">{systemMetrics.activeNodes}/{systemMetrics.totalNodes}</p>
              </div>
              <Monitor className="text-green-400" size={24} />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Training Speed</p>
                <p className="text-2xl font-bold text-purple-400">{systemMetrics.trainingSpeed}x</p>
              </div>
              <Zap className="text-purple-400" size={24} />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Model Accuracy</p>
                <p className="text-2xl font-bold text-yellow-400">{systemMetrics.modelAccuracy}%</p>
              </div>
              <TrendingUp className="text-yellow-400" size={24} />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Jobs</p>
                <p className="text-2xl font-bold text-orange-400">{trainingJobs.filter(j => j.status === 'training').length}</p>
              </div>
              <Activity className="text-orange-400" size={24} />
            </div>
          </div>
        </div>

        {/* Real-time Training Metrics */}
        {activeTraining && (
          <div className="bg-white/10 
