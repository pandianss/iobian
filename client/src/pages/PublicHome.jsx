import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Building2, Map, Users } from 'lucide-react';

const PublicHome = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200">
            <div className="glass-panel p-12 rounded-3xl text-center max-w-[1000px] w-[90%] border border-primary-color/10">
                <img src="/IOB_LOGO_2025.svg" alt="IOB" className="h-[120px] mb-6 object-contain mx-auto" />
                <h1 className="text-4xl mb-4 font-bold text-slate-800">Unified Banking Operations Portal</h1>
                <p className="text-lg text-text-secondary mb-12">
                    Centralized coordination for seamless banking operations.
                </p>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 justify-center">

                    {/* 1. IOB Online */}
                    <div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center p-8 border border-primary-color bg-white rounded-2xl" onClick={() => window.open('https://www.iob.in', '_blank')}>
                        <Globe size={40} className="mb-4 text-primary-color" />
                        <h4 className="mb-2 text-primary-color font-bold">IOB Online</h4>
                        <p className="text-sm text-text-secondary">Internet Banking & Corporate Website</p>
                    </div>

                    {/* 2. CO Departments */}
                    <div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center p-8 border border-secondary-color bg-white rounded-2xl">
                        <Building2 size={40} className="mb-4 text-secondary-color" />
                        <h4 className="mb-2 text-secondary-color font-bold">CO Departments</h4>
                        <p className="text-sm text-text-secondary">Central Office Portals & Circulars</p>
                    </div>

                    {/* 3. Region Website */}
                    <Link to="/public/region/3933" className="no-underline">
                        <div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center p-8 border border-accent-color bg-white rounded-2xl">
                            <Map size={40} className="mb-4 text-accent-color" />
                            <h4 className="mb-2 text-accent-color font-bold">Region Website</h4>
                            <p className="text-sm text-text-secondary">Dindigul Region Public Portal</p>
                        </div>
                    </Link>

                    {/* 4. Region User Login */}
                    <Link to="/login" className="no-underline">
                        <div className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center p-8 border border-red-500 bg-white rounded-2xl">
                            <Users size={40} className="mb-4 text-red-500" />
                            <h4 className="mb-2 text-red-500 font-bold">Region User Login</h4>
                            <p className="text-sm text-text-secondary">Authorized Staff Access Only</p>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default PublicHome;
