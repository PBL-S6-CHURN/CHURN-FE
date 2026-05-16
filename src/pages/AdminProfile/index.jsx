import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logoChurn.png';
import MainLayout from '../../layouts/MainLayout';
import { getProfile } from '../../api/userApi';

function AdminProfile({ adminData, setAdminData, onLogout, onNavChange, highRiskCustomers, onProfileClick }) {
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState("");
  const [isEditingPw, setIsEditingPw] = useState(false);
  // const [tempPw, setTempPw] = useState(adminData.password);
  const [loading, setLoading] = useState(true);

  //Upload Foto
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminData({ ...adminData, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Simpan Password Baru
  const savePassword = () => {
    setAdminData({ ...adminData, password: tempPw });
    setIsEditingPw(false);
    alert("Password berhasil diperbarui!");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await getProfile();
        const userData = response.data;
        setAdminData(userData.message);
        // setProfile(userData.foto);
        // setTempPw(userData.password || "");
        setLoading(false);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [])

  // Tampilan Loading
  if (loading) {
    return (
      <MainLayout title="Profil Admin" activeNav="profile" onNavChange={onNavChange} onLogout={onLogout} adminData={adminData} onProfileClick={onProfileClick} highRiskCustomers={highRiskCustomers}>
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#630000' }}>
          <h3>Memuat data profil...</h3>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title="Profil Admin"
      activeNav="profile"
      onNavChange={onNavChange}
      onLogout={onLogout}
      adminData={adminData}
      onProfileClick={onProfileClick}
      highRiskCustomers={highRiskCustomers}
    >
    <div className="card" style={{ maxWidth: '1200px', margin: '30px auto', padding: '40px' }}>
          <div className="profile-section" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div 
                className="profile-avatar-large" 
                onClick={() => fileInputRef.current.click()}
                style={{
                  width: '160px', height: '160px', borderRadius: '50%',
                  backgroundColor: '#EEEBDD', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', border: '4px solid #630000',
                  cursor: 'pointer', overflow: 'hidden'
                }}
              >
                {adminData.foto ? (
                  <img src={adminData.foto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <img src={logo} alt="Default" style={{ width: '70%', opacity: '0.5' }} />
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} style={{ display: 'none' }} accept="image/*" />
              <p style={{ fontSize: '0.7rem', color: '#630000', marginTop: '10px', fontWeight: 'bold' }}>Klik untuk Ganti Foto</p>
            </div>
            <div className="profile-info" style={{ flex: 1 }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '0.8rem', color: '#888' }}>Nama Admin</label>
                <input 
                  type="text" 
                  className="filter-select" 
                  style={{ width: '100%', background: '#f9f9f9', border: '1px solid #ddd', padding: '12px' }}
                  value={adminData?.username || ""}
                  onChange={(e) => setAdminData({ ...adminData, nama: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '0.8rem', color: '#888' }}>Email</label>
                <input 
                  type="email" 
                  className="filter-select" 
                  style={{ width: '100%', background: '#f9f9f9', border: '1px solid #ddd', padding: '12px' }}
                  value={adminData?.email || ""}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                />
              </div>
              {/* <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '0.8rem', color: '#888' }}>Password</label>
                <input 
                  type={isEditingPw ? "text" : "password"}
                  className="filter-select" 
                  style={{ width: '100%', background: '#f9f9f9', border: '1px solid #ddd', padding: '12px' }}
                  value={isEditingPw ? tempPw : "********"}
                  onChange={(e) => setTempPw(e.target.value)}
                  readOnly={!isEditingPw}
                />
              </div> */}
            </div>
          </div>
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
            <button 
              className="btn-logout-new" 
              style={{ flex: 1, margin: 0, borderRadius: '8px' }}
              onClick={() => alert("Perubahan Nama & Foto Berhasil!")}
            >
              Simpan Perubahan
            </button>
            
            {isEditingPw ? (
              <button 
                className="select-tool" 
                style={{ flex: 1, border: '1px solid #630000', borderRadius: '8px', background: '#630000', color: 'white' }}
                onClick={savePassword}
              >
                Konfirmasi Password Baru
              </button>
            ) : (
              <button 
                className="select-tool" 
                style={{ flex: 1, border: '1px solid #630000', borderRadius: '8px' }}
                onClick={() => setIsEditingPw(true)}
              >
                Ubah Password
              </button>
            )}
          </div>
        </div>
    </MainLayout>
  );
}

export default AdminProfile;